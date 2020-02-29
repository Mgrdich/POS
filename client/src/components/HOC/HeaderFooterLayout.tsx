import React from 'react';
import MenuDrawer from "../layout/Drawer/MenuDrawer";
import Footer from "../layout/Footer";

export function HeaderFooterLayout<P extends object>(WrappedComponent: React.ComponentType<P>):React.FC<P> {
    return function (props:P) {
           return (

               <MenuDrawer>
                   <section className="content">
                       <WrappedComponent {...props as P}/>
                       <Footer/>
                   </section>
               </MenuDrawer>
           )
    }
}
export default HeaderFooterLayout;