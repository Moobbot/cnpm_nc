import { Button } from 'primereact/button';

type Props = {
    label: string;
    onClick: () => void;
};

const CancelButton = ({ label, onClick }: Props) => {
    return <Button label={label} icon="pi pi-check" className="p-button-text" onClick={onClick} />;
};

export default CancelButton;
