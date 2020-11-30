# v2.0.1
## Fix
Fix the name spelling of the property of `ConsulConfig`。

# v2.0.0
## Breaking Changes
1. Use new [api](doc/api.md).
## Add
1. Add support for consul.

# v1.0.0
## Breaking Changes
1. Remove the function of `setAlarm`, it doesn't send alarm message when using wrong configuration item, throw an `Error` instead.

# v0.2.2
## Improve
1. Bump node-slogger to 2.0.0.

# v0.2.1
## Fix
1. Fix the issue of not call alarm function after load necessary object failed.

# v0.2.0
## Add
1. Add the function `setAlarm` to set the alarm object later.

# v0.1.0
## Add
1. Project init.