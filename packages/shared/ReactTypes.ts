// 类型定义
export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__mark: string;
}
// 对应两种触发更新的方式 this.setState({xx:1}) 和 this.setState(({xx:1})=>{xx:2})
export type Action<State> = State | ((prevState: State) => State);
