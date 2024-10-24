// ReactElement数组结构
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { Type, Key, Ref, Props, ElementType } from 'shared/ReactTypes';
// 构造函数
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props) {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // 内部使用的字段，通过这个字段指明当前使用的是ReactElement
		type,
		key,
		ref,
		props,
		__mark: 'karim' // 与真实react项目区分
	};
	return element;
};

// 实现JSX方法
// 定义jsx的dev，表示在生产和开发环境都是同一个实现
export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null; // 默认为null
	const props: Props = {};
	let ref: Ref = null;
	// 遍历config，将遍历到的每一个prop赋值给props对象
	for (const prop in config) {
		const val = config[prop];
		// 如果prop的key为key，则赋值变更为字符串
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		// 如果prop的key为ref，ref赋值为val
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 其他，是否为config自己的prop
		if ({}.hasOwnProperty.call(config, prop)) {
			// 如果为自己的prop，如果为原型则不赋值
			props[prop] = val;
		}
	}
	// 获取长度
	//   const maybeChildrenLength = maybeChildren.length;
	//   // 判断长度，如果大于0，则表示有多余children
	//   if (maybeChildrenLength) {
	//     if (maybeChildren === 1) {
	//       props.children=maybeChildren[0]
	//     } else {
	//       props.children=maybeChildren
	//     }
	//   }
	// 返回新的ReactElement
	return ReactElement(type, key, ref, props);
	// }
};
