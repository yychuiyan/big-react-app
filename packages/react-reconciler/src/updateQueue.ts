import { Action } from 'shared/ReactTypes';

// 创建Update的数据结构，因为action有两种方式所以类型定义了两种
export interface Update<State> {
	action: Action<State>;
}
// 定义UpdateQueue
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

// 创建Update实例的方法，返回Update实例
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};
// 初始化UpdateQueue的实例方法
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

// 往UpdateQueue中增加update的方法
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};

// UpdateQueue消费update的方法
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	// 返回值应为全新的状态
	// 定义最终结果
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	// 消费过程，两种情况
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1 update (x)=>4x --> memoizedState 4
			result.memoizedState = action(baseState);
		} else {
			// baseState 1 update 2 --> memoizedState 2
			result.memoizedState = action;
		}
	}
	return result;
};
