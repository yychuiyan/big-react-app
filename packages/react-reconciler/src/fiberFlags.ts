export type Flags = number;

export const NoFlags = 0b0000001; // 当前没标记
export const Placement = 0b0000010;
export const Update = 0b0000100; // 更新属性
export const ChildDeletion = 0b0001000; // 删除子节点
