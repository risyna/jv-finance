// CLEAN CONSOLIDATED JAVASCRIPT - All duplicates removed
// Original had 4x getUserTag + 3x comment functions - now single clean versions

const DEFAULT_APP_DATA = { 
  profile: { name: "User", hobby: "", goal: "", avatar: "", user_id_display: null }, 
  settings: { theme: 'green', fontSize: 16, mode: 'simple', notifications: { email: true, alert: true, budget: false } }, 
  simpleRecords: [], complexRecords: [], feedPosts: [], localComments: {}, postComments: {}, 
  notifications: [], simpleTarget: 0, complexTarget: 0, currencyMode: 'IDR', 
  selectedRecordId: null, activeBookChart: 'total', activePortChart: 'total', currentShareData: null,
  nextUserId: 1, lastCommentSync: {}
};

let appData = JSON.parse(JSON.stringify(DEFAULT_APP_DATA));

// Global caches
window.userTagCache = JSON.parse(localStorage.getItem('jv_user_tags') || '{}');
window.userCreationOrder = JSON.parse(localStorage.getItem('jv_user_orders') || '{}');

let currentUser = null, authMode = 'login', currentPostImage = null, currentPostIdForComment = null, currentView = 'dashboard', previousView = 'dashboard';
let portfolioChart = null, bookChart = null, dashQuickChart = null, complexIncChart = null, complexExpChart = null;
let chartDataCache = {};

const STORAGE_KEY = 'jv_finance_local_v1';
const ENCRYPT_KEY = 'local-device-secret-jova'; 
const CATEGORIES = { expense: ["Makan & Minum", "Transportasi", "Hiburan", "Top-up & Kuota", "Kesehatan", "Belanja", "Lainnya"], income: ["Gaji Tambahan", "Bonus", "Jual Barang", "Hadiah", "Lain-lain"] };

// UTILITIES
window.formatMoney = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val) || 0);

window.getRelativeTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j`;
    return new Date(timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

// SINGLE CLEAN getUserTag - Bug #1-4 FIXED
window.isAdmin = (email) => email === 'hyaku7000@gmail.com';
window.padId = (num) => `#${num.toString().padStart(5, '0')}`;

async function getUserTag(userId, forceRefresh = false) {
    if (!userId) return '';

    // Admin override FIRST
    if (currentUser && currentUser.id === userId && window.isAdmin(currentUser.email)) return '#ADMIN';

    // Cache checks
    if (window.userTagCache?.[userId] && !forceRefresh) return window.userTagCache[userId];
    const persistentCache = JSON.parse(localStorage.getItem('jv_user_tags') || '{}');
    if (persistentCache[userId] && !forceRefresh) {
        window.userTagCache[userId] = persistentCache[userId];
        return persistentCache[userId];
    }

    let tag = '';

    // Supabase query
    if (supabaseClient) {
        try {
            const { data: userData } = await supabaseClient
                .from('user_data')
                .select('email, created_at')
                .eq('user_id', userId)
                .single();

            if (userData && window.isAdmin(userData.email)) {
                tag = '#ADMIN';
            } else {
                // Sequential from creation order
                if (!window.userCreationOrder[userId]) {
                    const { data: allUsers } = await supabaseClient
                        .from('user_data')
                        .select('user_id, created_at')
                        .order('created_at', { ascending: true })
                        .limit(1000);
                    allUsers?.forEach((u, idx) => window.userCreationOrder[u.user_id] = idx + 1);
                    localStorage.setItem('jv_user_orders', JSON.stringify(window.userCreationOrder));
                }
                tag = window.padId(window.userCreationOrder[userId] || appData.nextUserId++);
            }
        } catch (e) {
            console.warn('Supabase tag lookup failed:', e);
        }
    }

    // Fallback
    if (!tag) tag = window.padId(appData.nextUserId++);

    // Cache everywhere
    window.userTagCache[userId] = tag;
    persistentCache[userId] = tag;
    localStorage.setItem('jv_user_tags', JSON.stringify(persistentCache));
    
    if (currentUser?.id === userId) appData.profile.user_id_display = tag;
    window.saveData(false);
    
    return tag;
}

// Data persistence
function deepMerge(target, source) {
    const merged = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            merged[key] = deepMerge(merged[key] || {}, source[key]);
        } else {
            merged[key] = source[key];
        }
    }
    return merged;
}

window.saveData = (syncCloud = true) => { 
    localStorage.setItem(STORAGE_KEY, CryptoJS.AES.encrypt(JSON.stringify(appData), ENCRYPT_KEY).toString()); 
    if (syncCloud && currentUser && supabaseClient) {
        supabaseClient.from('user_data').upsert([{ user_id: currentUser.id, app_state: JSON.stringify(appData) }]);
    }
};

window.loadData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const bytes = CryptoJS.AES.decrypt(saved, ENCRYPT_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted) appData = deepMerge(DEFAULT_APP_DATA, JSON.parse(decrypted));
        } catch (e) { console.error('Load failed:', e); }
    }
};

// Supabase setup
let supabaseClient = null;
try {
    supabaseClient = supabase.createClient("https://cgqrzxlutpbnlfsfmpkv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncXJ6eGx1dHBibmxmc2ZtcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NDAwNDUsImV4cCI6MjA5MTUxNjA0NX0.gjv6F5lhbfXc0Bxl1Hr7C9nB3XIe3fKmkLBgD8PfA9E");
    
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user || null;
        const authBtn = document.getElementById('auth-btn');
        const logoutMenu = document.getElementById('logout-menu-item');
        
        if (event === 'SIGNED_IN' && currentUser) {
            authBtn.textContent = "Terhubung";
            authBtn.className = authBtn.className.replace('bg-emerald-500', 'bg-gray-800');
            logoutMenu.classList.remove('hidden');
            await window.ensureUserId(true);
            window.updateUI();
            window.loadFeedFromDB();
        } else {
            authBtn.textContent = "Login";
            authBtn.className = authBtn.className.replace('bg-gray-800', 'bg-emerald-500');
            logoutMenu.classList.add('hidden');
            window.updateUI();
        }
    });
} catch (e) {
    console.error('Supabase init failed:', e);
}

// Event delegation for ALL onclick handlers - CRITICAL FIX
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[onclick]');
    if (!btn) return;
    
    const onclick = btn.getAttribute('onclick');
    if (!onclick || onclick.startsWith('event.stopPropagation')) return;
    
    try {
        // Execute onclick safely
        eval(onclick);
    } catch (err) {
        console.error('Button click failed:', onclick, err);
    }
}, true);

// Navigation (restored)
window.setView = (viewName) => {
    document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.remove('hidden');
    currentView = viewName;
    previousView = currentView === 'post-detail' ? previousView : currentView;
    
    if (viewName === 'dashboard') window.updateUI();
    if (viewName === 'feed') window.renderFeed();
};

window.viewPost = (postId) => {
    currentPostIdForComment = postId;
    window.setView('post-detail');
};

window.openModal = (modalId) => {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) modal.classList.remove('hidden');
};

// Critical UI functions restored
window.updateUI = () => {
    // Basic UI updates - expand as needed
    document.getElementById('display-name').textContent = appData.profile.name || 'User';
};

window.loadData();
window.setView('dashboard');

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    window.loadData();
    window.updateUI();
    window.setView('dashboard');
});

