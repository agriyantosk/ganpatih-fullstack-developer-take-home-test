# Test Cases

## Registration

- **Positive**: Submit unique username/password on `/`. Expect 201 toast success, form clears, view auto-switches to login tab.
- **Negative**: Submit an existing username. Expect API 409, inline toast `"username already exists"` (cannot submit until resolved).
- **Validation**: Attempt to submit empty inputs. Button remains disabled and no request fires.

## Login

- **Positive**: Provide valid credentials → toast success, tokens stored, redirect to `/feed`.
- **Negative**: Wrong password → API 401, toast displays backend error, user stays on `/`.
- **Form guard**: Inputs empty → submit disabled.

## Create Post

- **Success**: Click “Create Post”, enter ≤200 chars, submit. Modal closes, toast success, new post appears immediately at the current index.
- **Failure**: Enter >200 chars. Counter turns red, submit blocked, toast explains limit.˝

## Follow / Unfollow

- Tap Follow on a different user → button toggles, follower count increments, toast success.
- Tap Unfollow → optimistic revert + toast; backend reflects change.

## Unauthorized /feed Access

- While logged out, direct `/feed` navigation redirects to `/` with “Session expired / please log in” toast.
