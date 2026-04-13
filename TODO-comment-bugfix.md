# Comment System Bugfix - APPROVED PLAN ✅
*Date: Now* | *Status: 1/6 - getUserTag() Enhanced ✅*

## Breakdown from Approved Plan:

### **1. 💎 ENHANCE getUserTag()** `[ ]`
- LocalStorage fallback + offline generator
- Cache refresh for old posts

### **2. 🔄 OPTIMIZE loadPostComments()` `[ ]`
- Delta sync (timestamp filter)
- 5s debounce + 1min cache TTL

### **3. ✅ FIX sendDetailComment()` `[ ]`
- 3x retry + 10s poll
- Timeout → local-only warning

### **4. 📱 Feed Comment Preview** `[ ]`
- renderFeed(): Top 2 comments + tags
- Collapsible expand inline

### **5. ⚡ Background Sync** `[ ]`
- syncAllPostComments() every 2min
- Virtual scroll >20 comments

### **6. 🧹 UI Polish** `[ ]`
- Sync status timeout 15s
- Tag colors + skeleton loading

## Testing Checklist:
- [ ] Old comments auto-tagged
- [ ] New comments sync reliably  
- [ ] Feed shows preview w/ tags
- [ ] Offline graceful
- [ ] No more infinite reloads

## Next: Edit index.html step-by-step
*Progress will be updated after each step.*

