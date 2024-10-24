// 表示什么类型的节点
export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; // 项目挂在的根节点对应Fiber节点的类型
export const HostComponent = 5; // <div> 元素对应的类型
export const HostText = 6; // <div>123</div>元素下的文本
