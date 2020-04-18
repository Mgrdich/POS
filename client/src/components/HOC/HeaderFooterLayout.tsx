import React from 'react';
import MenuDrawer from "../layout/Drawer/MenuDrawer";

export function HeaderFooterLayout<P extends object>(WrappedComponent: React.ComponentType<P>):React.FC<P> {
    return function (props:P) {
        return (
            <>
                <section className="content">
                    <MenuDrawer>
                        <WrappedComponent {...props as P}/>

                    </MenuDrawer>
                </section>
            </>
        )
    }
}
export default HeaderFooterLayout;