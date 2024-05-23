import * as stylex from '@stylexjs/stylex';
import { ReactNode, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ThemeSelector from '../themes/ThemeSelector';

const styles = stylex.create({
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'no-wrap'
    },
    spacer: (isOpen: boolean) => ({
        maxWidth: isOpen ? 'min(100%, 300px)' : 48,
        width: '100%',
        transition: 'max-width 150ms ease-in-out'
    }),
    outside: {
        flexGrow: 1,
    },
    panel: (isOpen: boolean) => ({
        position: 'fixed',
        background: '#313131',
        borderRight: '1px solid white',
        left: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        maxWidth: 'min(100%, 300px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 16,
        padding: 16,
        transform: isOpen ? 'none' : 'translate( calc( 48px - 100% ), 0 )',
        paddingRight: isOpen ? 16 : 48,
        transition: 'transform 150ms ease-in-out',
        "@media print": {
            display: 'none'
        }
    }),
    header: (isOpen: boolean) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: isOpen ? 0 : -32
    })
});

const LeftPanel = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.spacer(isOpen))}>
            <div {...stylex.props(styles.panel(isOpen))} >
                <div {...stylex.props(styles.header(isOpen))}>
                    <h1> Settings </h1>
                    {isOpen ? <FaAngleLeft cursor="pointer" onClick={() => {
                        setIsOpen(false);
                    }} /> : <FaAngleRight cursor="pointer" onClick={() => {
                        setIsOpen(true)
                    }} /> }
                </div>
                <ThemeSelector />
            </div>
        </div>
        <div {...stylex.props(styles.outside)}>
            {children}
        </div>
    </div>
  )
}

export default LeftPanel