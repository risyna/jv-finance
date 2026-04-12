# JV Finance Bugfix - Execution Tracker
Status: ✅ **Step 1 Complete - 0/6**

## Plan Steps:
### Step 0. Create TODO.md ✅

### Step 1. **Add postComments to appData** ✅ (index.html)
- DEFAULT_APP_DATA: add `postComments: {}`
- loadData(): ensure `appData.postComments = {}`
- saveData(): persists automatically

### Step 2. **Fix Auth Listener** ✅ (index.html)
```
if(event === 'SIGNED_OUT') {
    currentUser = null;
    localStorage.clear();
    appData = JSON.parse(JSON.stringify(DEFAULT_APP_DATA));
    // Update auth UI
    return; // Skip cloud sync
}
```

### Step 3. **Robust loadPostComments()** ✅ (index.html)
```
✅ Cache-first + localComments → postComments migration
✅ DB merge + robust dedupe (id OR timestamp) 
✅ Sort newest first + offline-first render
✅ Persist to postComments cache
```

**Next: Step 4 - Optimistic sendDetailComment() + sync flag**

### Step 4. **Optimistic sendDetailComment()**
- Immediate cache push with optimisticId
- Background DB sync
- 'db_synced' flag for UI indicator

### Step 5. **Fix logout() sequence**
```
localStorage.clear() FIRST → reset appData → supabase.signOut()
window.updateUI()
NO location.reload()
```

### Step 6. **Update renders** (viewPost, renderProfileFeed)
- Use postComments cache

### Step 7. **Testing & Cleanup**
```
✅ Login/Logout cycle
✅ Comment persistence  
✅ Multi-tab sync
✅ Update all TODOs → attempt_completion
```

**Next: Implement Step 1 (appData init)**
