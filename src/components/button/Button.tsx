interface Button {
    isCollapsed: boolean;
}
export default function Button(props: Button) {
    return (
        <button 
            className='menu-toggle-btn'
            data-iscollapsed = {props.isCollapsed} 
            // aria-controls="navbar-navigation" 
            // aria-expanded="false"
        >
        <span></span>
        </button> 
    );
}