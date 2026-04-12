# JV Finance Bugfix - Implementation Steps
Status: 🔄 In Progress

## Breakdown from Approved Plan:

### 1. Create this TODO ✅
### 2. **Fix Logout + Auth Listener** ✅
   - Add `if(event === 'SIGNED_OUT') return;` in `onAuthStateChange` BEFORE cloud sync
   - Remove `location.reload()` from `logout()` to prevent double-reload
   - Listener now fully skips cloud sync on SIGNED_OUT

### 3. **Implement Comments Cache** ⏳
   - Add `loadPostCommentsCache()` helper
   - Update `loadPostComments()` to merge cache+DB  
   - `sendDetailComment()`: optimistic cache push → DB → no reload
   - Persist `appData.postComments` in `saveData()/loadData()`

### 4. **Update Feed/Profile Renders** ⏳
   - Use cache in `viewPost()` render
   - Cache-aware `renderProfileFeed()`

### 5. **Full Test Cycle** ⏳
   ```
   - Login → Comment → Navigate away/back → persists (cache)
   - Multi-tab: Comment in tab1 → tab2 refresh → shows  
   - Logout → NO data restore (no cloud sync)
   ```

### 6. **Update Progress & Complete** ⏳

**Next Step: Fix logout auth listener**

