import InitialHookClass from './lib/InitialHook';

if (!window.__METAL_DEV_TOOLS_HOOK__) {
	const InitialHook = new InitialHookClass();

	window.__METAL_DEV_TOOLS_HOOK__ = InitialHook.add.bind(InitialHook);
	window.__METAL_DEV_TOOLS_HOOK__.getAll = InitialHook.getAll.bind(InitialHook);
	window.__METAL_DEV_TOOLS_HOOK__.hasComponents = InitialHook.hasComponents.bind(InitialHook);
}
