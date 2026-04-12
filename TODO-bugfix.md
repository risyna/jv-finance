# JV Finance Bugfix Plan
Status: 🔄 Planning

## Critical Bugs Reported:
### 1. **Logout Failure** 
- Symptom: Shows "Berhasil Login!" but stays logged in
- Root Cause: Supabase auth.SIGNED_OUT listener syncs cloud data after localStorage.clear()
- Fix: Skip cloud sync + full app reset in listener on SIGNED_OUT

### 2. **Comments Disappear**
- Symptom: New comment shows optimistic UI → navigate away/back → gone
- Root Cause: No client-side comment cache, always fresh DB fetch
- Fix: appData.postComments local cache + optimistic insert + DB sync

## Implementation Steps:
1. Fix logout() + auth listener
2. Add appData.postComments cache 
3. Update sendDetailComment() + loadPostComments()
4. Test full cycle

**Ready to implement after confirmation**
