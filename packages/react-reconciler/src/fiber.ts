import { Props, Key, Ref } from '../../shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;

	alternate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;
	// pendingProps：FiberNode接下来有哪些类型的props需要改变，key：对应ReactElement的key，tag指的是FiberNode是什么类型的节点
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例的属性
		this.tag = tag;
		this.key = key;
		// HostComponent 如果是<div>则保存div的DOM
		this.stateNode = null;
		// FiberNode的类型
		this.type = null;
		/**
		 * 构成树状结构
		 **/
		// 指向父fibernode
		this.return = null;
		// 指向兄弟fibernode
		this.sibling = null;
		// 指向子fibernode
		this.child = null;
		this.index = 0;

		this.ref = null;
		// 作为工作单元
		this.pendingProps = pendingProps; // 工作单元刚开始准备工作的时候prop是什么
		this.memoizedState = null;
		this.memoizedProps = null; // 工作完成后的props是什么
		this.updateQueue = null;

		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
	}
}
// 定义FiberRootNode类
export class FiberRootNode {
	container: Container; // 保存对应数组环境挂载的节点rootElement，不能直接设置类型为DOMElementContainer，因为其他数组类型没有DOMElement
	current: FiberNode; // current指针是指向的FiberNode
	finishedWork: FiberNode | null; // 指向更新完成后的hostRootFiber
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	// 每次传递过来一个FiberNode，最终经过一系列操作返回FiberNode的alternate
	// 相当于双缓存中每次都获取对应的FiberNode
	let wip = current.alternate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.type = current.type;
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		// 清除副作用
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};
