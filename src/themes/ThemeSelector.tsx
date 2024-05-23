import useSettings from "../Settings/useSettings";
import { type ThemeName } from "./themes";
import * as stylex from '@stylexjs/stylex';

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

const ThemeSelector = () => {
    const { mode, setMode, themeName, setThemeName} = useSettings();

  return (
    <fieldset {...stylex.props(styles.set)}>
        <legend {...stylex.props(styles.legend)} >Styling</legend>
        <div>
            <label {...stylex.props(styles.label)} htmlFor="mode"> Mode: </label>
            <select name="mode" value={mode} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                setMode(value as 'light' | 'dark');
            }}>
                <option {...stylex.props(styles.option)} value="light">Light</option>
                <option {...stylex.props(styles.option)} value="dark">Dark</option>
            </select>
        </div>
        <div>
            <label {...stylex.props(styles.label)} htmlFor="theme"> Theme: </label>
            <select name="theme" value={themeName} {...stylex.props(styles.dropdown)} onChange={({target: { value }}) => {
                setThemeName(value as ThemeName)
            }}>
                <option {...stylex.props(styles.option)} value="default">Default</option>
                <option {...stylex.props(styles.option)} value="dracula">Dracula</option>
            </select>
        </div>
    </fieldset>
  )
}

export default ThemeSelector