export default function TabButton({children, onSelect, isSelected}) {
//document.querySelector...
    return (
        <li>
            <button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button>
        </li>
    );
}