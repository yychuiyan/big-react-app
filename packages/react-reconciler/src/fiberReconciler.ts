import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';

import { ReactElementType } from 'shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';

/**
 * 当调用ReactDOM.createRoot()方法后，内部执行
 */
export function createContainer(container: Container) {
	// HostRoot是dom节点对应的fiber就是hostRootFiber，第二个参数pendingProps，第三个参数key
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	// hostRootFiber和FiberRootNode关联
	const root = new FiberRootNode(container, hostRootFiber);
	// 创建UpdateQueue
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}
/**
 * 调用render方法后，内部执行
 */
export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);
	// 将update插入到hostRootFiber下的updateQueue中
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	// 从fiber中调度
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
