# JV Finance Instagram Fixes - Progress Tracker
**Status: 0/6 Complete** | Approved Plan Implementation

## Plan Steps (from analysis):

### [ ] 1. Create this TODO.md ✅ **DONE**

### [ ] 2. Fix Login Animation/UI State
- Add `window.setView('dashboard')` + `window.updateUI()` in auth callback
- Ensure profile/dashboard visible after login

### [ ] 3. Fix Comments "Syncing" Stuck
- Update `sendDetailComment()` → set `db_synced=true` on ALL local comments
- Force `window.loadPostComments()` refresh after Supabase success

### [ ] 4. Integrate retryCommentSync
- Add full retry logic to index.html global scope
- **Delete** retryCommentSync.js (stub → integrated)

### [ ] 5. Migrate/Verify User Tags
- Call `window.migrateUserTags()` 
- Test #ADMIN + #00001+ sequential

### [ ] 6. Test All Features
```
✅ Login → dashboard visible (no spinner)
✅ Comment → "Syncing..." → synced (spinner gone)  
✅ Feed post → public + tags visible
✅ Logout → social preserved, finance reset
✅ Multi-tab sync
```
**Command:** `attempt_completion`

## Files to Edit:
- index.html (3 targeted JS fixes)
- DELETE: retryCommentSync.js

**Next:** Step 2 - Edit index.html login fix

