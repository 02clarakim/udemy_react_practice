export default function TabButton({children, isSelected, ...props}) {
    //document.querySelector...
        return (
            <li>
                <button className={isSelected ? 'active' : undefined} {...props}>{children}</button>
            </li>
        );
    }