import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
// 全局指针，指向正在工作的FiberNode
let workInprogress: FiberNode | null = null;

// 定义一个方法用于执行初始化
function prepareRefreshStack(root: FiberRootNode) {
	// FiberRootNode不是一个普通的fiber不能直接赋值，需要变更为方法来创建workInProgress
	workInprogress = createWorkInProgress(root.current, {}); // 赋值为FiberNode
}
// 连接Contain和renderRoot方法
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	/**
	 * 首屏渲染传递过来的fiber是hostRootFiber，其他流程如this.setState，传递过来的是classComponentFiber中的fiber，需要从当前的fiber一直遍历到根节点->fiberRootNode
	 */
	// TODO 调度功能
	// fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}
// 遍历到根节点
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	// 当前节点赋值为node
	let node = fiber;
	// 父节点
	let parent = node.return;
	// 如果父节点存在，表示普通fiberNode
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	// 如果fiber的类型是HostRoot
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}
function renderRoot(root: FiberRootNode) {
	// 初始化，让当前workInprogress指向需要遍历的第一个FiberNode
	prepareRefreshStack(root);

	/**
	 * 执行递归的流程
	 */
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('workLoop发生错误', e);
			workInprogress = null;
		}
	} while (true);
}
// 实现workLoop方法
function workLoop() {
	// workInprogress不等于null则持续执行
	while (workInprogress !== null) {
		performUnitOfWork(workInprogress);
	}
}
// 持续执行
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInprogress = next;
	}
}
// 完成执行,如果没有子节点遍历兄弟节点
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInprogress = sibling;
			return;
		}
		node = node.return;
		workInprogress = node;
	} while (node !== null);
}
