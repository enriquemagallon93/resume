// import { useRef } from "react";
import useSettings from "../Settings/useSettings";
import * as stylex from '@stylexjs/stylex';
// import { PageSize } from "./types";
import { A4, LETTER } from "./constants";

const styles = stylex.create({
    set: {
        border: "1px solid white",
        paddingBlockStart: 8,
        paddingBlockEnd: 8,
        paddingInlineStart: 8,
        paddingInlineEnd: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    legend: {
        paddingInlineStart: 4,
        paddingInlineEnd: 4
    },
    label: {
        width: 60,
        display: 'inline-block'
    },
    dropdown: {
        border: '1px solid',
        borderRadius: 3,
        padding: "0 8px",
        appearance: 'auto',
        width: 100
    },
    option: {
        color: 'black'
    }
});

const PageSizeSelector = () => {
    const {
        width,
        setWidth,
        height,
        setHeight,
        horizontalMargin,
        // setHorizontalMargin,
        verticalMargin,
        // setVerticalMargin,
        isCustomWidth,
        isCustomHeight,
        // isCustomHorizontalMargin,
        // isCustomVerticalMargin
    } = useSettings();

  return (
    <fieldset {...stylex.props(styles.set)}>
        <legend {...stylex.props(styles.legend)} >Page Size</legend>
        <div>
            <label {...stylex.props(styles.label)} htmlFor="width"> Width: </label>
            <select name="width" value={isCustomWidth ? 'custom' : width} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                setWidth((value === 'custom' ? `custom-${width}`: value) as any );
            }}>
                <option {...stylex.props(styles.option)} value={A4.width}>A4</option>
                <option {...stylex.props(styles.option)} value={LETTER.width}>Letter</option>
                <option {...stylex.props(styles.option)} value="custom">Custom</option>
            </select>
            {isCustomWidth ? (
                <>
                    <br />
                    <input name="custom-width" type="number" value={(width + '').replace(/(cm|mm|in|px|pt|pc|%)$/, '')} onChange={({ target: { value }}) => {
                        setWidth(`custom-${value}${(width + '').replace(/.*(?=(cm|mm|in|px|pt|pc|%))/, '')}` as any)
                    }} />
                    <select name="custom-width-units" value={(width + '').replace(/.*(?=(cm|mm|in|px|pt|pc|%))/, '')} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                        setWidth((`custom-${(width + '').replace(/(cm|mm|in|px|pt|pc|%)$/, '')}${value}`) as any );
                    }}>
                        <option {...stylex.props(styles.option)} value="cm">cm</option>
                        <option {...stylex.props(styles.option)} value="mm">mm</option>
                        <option {...stylex.props(styles.option)} value="in">in</option>
                        <option {...stylex.props(styles.option)} value="px">px</option>
                        <option {...stylex.props(styles.option)} value="pt">pt</option>
                        <option {...stylex.props(styles.option)} value="pc">pc</option>
                        <option {...stylex.props(styles.option)} value="%">%</option>
                    </select>
                </>
            ):null}

            <br />

            <label {...stylex.props(styles.label)} htmlFor="height"> Height: </label>
            <select name="height" value={isCustomHeight ? 'custom' : height} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                setHeight((value === 'custom' ? `custom-${height}`: value) as any );
            }}>
                <option {...stylex.props(styles.option)} value={A4.height}>A4</option>
                <option {...stylex.props(styles.option)} value={LETTER.height}>Letter</option>
                <option {...stylex.props(styles.option)} value="custom">Custom</option>
            </select>
            {isCustomHeight ? (
                <>
                    <br />
                    <input name="custom-height" type="number" value={(height + '').replace(/(cm|mm|in|px|pt|pc|%)$/, '')} onChange={({ target: { value }}) => {
                        setHeight(`custom-${value}${(height + '').replace(/.*(?=(cm|mm|in|px|pt|pc|%))/, '')}` as any)
                    }} />
                    <select name="custom-height-units" value={(height + '').replace(/.*(?=(cm|mm|in|px|pt|pc|%))/, '')} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                        setHeight((`custom-${(height + '').replace(/(cm|mm|in|px|pt|pc|%)$/, '')}${value}`) as any );
                    }}>
                        <option {...stylex.props(styles.option)} value="cm">cm</option>
                        <option {...stylex.props(styles.option)} value="mm">mm</option>
                        <option {...stylex.props(styles.option)} value="in">in</option>
                        <option {...stylex.props(styles.option)} value="px">px</option>
                        <option {...stylex.props(styles.option)} value="pt">pt</option>
                        <option {...stylex.props(styles.option)} value="pc">pc</option>
                        <option {...stylex.props(styles.option)} value="%">%</option>
                    </select>
                </>
            ):null}
        </div>
        <div>
            {width}
            <br />
            {height}
            <br />
            {horizontalMargin}
            <br />
            {verticalMargin}
        </div>
    </fieldset>
  )
}

export default PageSizeSelector