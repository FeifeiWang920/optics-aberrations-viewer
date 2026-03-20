# 物理文本与布局优化计划 (Text & Layout Refactoring Plan)

## 1. 物理小贴士与数学表达式的准确性修复
当前 `AberrationPageLayout` 中硬编码了球差的解释和公式，导致所有页面展示相同内容。
**修改方案**：
更改 `AberrationPageLayoutProps` 接口，新增 `tips: string[]` 和 `mathExpression: React.ReactNode` 属性。并在各像差子页面传入准确的对应数据：

* **球差 (Spherical)**
  - 贴士：轴上单色光缺陷 / 边缘近轴焦点不重合 / 非球面或双合透镜校正
  - 公式：`ΔL' = W_040 · h² + W_060 · h⁴`

* **色差 (Chromatic)**
  - 贴士：材料散色引起 / 蓝光焦距短红光长 / 消色差双合透镜校正
  - 公式：`f(λ) = 1 / [(n(λ) - 1)(1/R₁ - 1/R₂)]`

* **彗差 (Coma)**
  - 贴士：离轴未校正导致 / 呈彗星状不对称斑 / 需满足阿贝正弦条件
  - 公式：`Δy' = W_131 · r² (2 + cos 2θ)`

* **像散 (Astigmatism)**
  - 贴士：子午/弧矢面折光率相异 / 垂直的双焦线与最小弥散圆 / 离轴斜射固有缺陷
  - 公式：`Δx = x'_s - x'_t ∝ y²_obj`

* **场曲 (Field Curvature)**
  - 贴士：实际像面为曲面(Petzval面) / 中心清晰边缘糊 / 引入平场镜校正
  - 公式：`1/R_P = -n ∑ (1 / n_i f_i)`

* **畸变 (Distortion)**
  - 贴士：横向放大率随视场角非线性变化 / 桶形与枕形 / 仅改变形状不影响清晰度
  - 公式：`Δy' = W_311 · y_obj³`

## 2. Characteristic View (特征透视图) 布局优化
当前 `<RayCanvas>` 和 `<AberrationVisuals>` 采用固定的宽高比 (`aspect-video` 和 `aspect-[2/1]`)，在并排 `grid` 中高度不一，导致大屏/宽屏下底部出现留白，显得违和。

**修改方案**：
1. `AberrationVisuals` 组件移除硬编码的宽高比，改用 `h-full flex-grow` 充满父容器高度。
2. 页面中用 `items-stretch` 属性，强制让光路侧和光斑侧上下并齐，实现无缝的高度统一拼图效果。
