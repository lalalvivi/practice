import React from "react";
const TextStyle = (props: any) => {
  const { textDispatch, txState } = props;
  return (
    <div>
      <span>字号：</span>
      <input
        value={txState.fontSize}
        type="number"
        onChange={(e) =>
          textDispatch({ type: "fontSize", fontSize: Number(e.target.value) })
        }
        min="12"
        max="60"
        step="2"
      />
      <span>字体：</span>
      <select
        value={txState.fontFamily}
        onChange={(e) =>
          textDispatch({ type: "fontFamily", fontFamily: e.target.value })
        }
      >
        <option value="serif">有边饰字体</option>
        <option value="cursive">卷曲字体 </option>
        <option value="fantasy">花哨字体</option>
      </select>
      <span>文本对齐选项：</span>
      <select
        value={txState.textAlign}
        onChange={(e) =>
          textDispatch({ type: "textAlign", textAlign: e.target.value })
        }
      >
        <option value="start">开始对齐</option>
        <option value="end">结束对齐 </option>
        <option value="left">左对齐</option>
        <option value="right">右对齐</option>
        <option value="center">中间对齐</option>
      </select>
      <span>基线对齐选项：</span>
      <select
        value={txState.textBaseline}
        onChange={(e) =>
          textDispatch({ type: "textBaseline", textBaseline: e.target.value })
        }
      >
        <option value="top">顶端</option>
        <option value="hanging">悬挂 </option>
        <option value="middle">正中</option>
        <option value="alphabetic">普通</option>
        <option value="ideographic">表意</option>
        <option value="bottom">底端</option>
      </select>
      <span>文本方向：</span>
      <select
        value={txState.direction}
        onChange={(e) =>
          textDispatch({ type: "direction", direction: e.target.value })
        }
      >
        <option value="ltr">从左到右</option>
        <option value="rtl">从右到左 </option>
        <option value="inherit">父继承</option>
      </select>
    </div>
  );
};
export default TextStyle;
