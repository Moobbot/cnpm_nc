import { InputText } from 'primereact/inputtext';
import React from 'react';

interface ConnectionConfigFormProps {
  formData: {
    port: string;
    baudrate: string;
    parity: string;
    databits: string;
    stopbits: string;
  };
  errors: Record<string, string>;
  handleInputChange: <K extends keyof ConnectionConfigFormProps['formData']>(key: K, value: ConnectionConfigFormProps['formData'][K]) => void;
}

const SerialForm: React.FC<ConnectionConfigFormProps> = ({ formData, errors, handleInputChange }) => {
  return (

      <div className="formgrid grid">
        <div className="field col-12">
          <label htmlFor="port">Port:</label>
          <InputText
            id="port"
            value={formData.port}
            onChange={(e) => handleInputChange('port', e.target.value)}
          />
          {errors.port && <small className="p-error">{errors.port}</small>}
        </div>
        <div className="field col-12">
          <label htmlFor="baudrate">Baudrate:</label>
          <InputText
            id="baudrate"
            value={formData.baudrate}
            onChange={(e) => handleInputChange('baudrate', e.target.value)}
          />
          {errors.baudrate && <small className="p-error">{errors.baudrate}</small>}
        </div>
        <div className="field col-12">
          <label htmlFor="parity">Parity:</label>
          <InputText
            id="parity"
            value={formData.parity}
            onChange={(e) => handleInputChange('parity', e.target.value)}
          />
          {errors.parity && <small className="p-error">{errors.parity}</small>}
        </div>
        <div className="field col-12">
          <label htmlFor="databits">Databits:</label>
          <InputText
            id="databits"
            value={formData.databits}
            onChange={(e) => handleInputChange('databits', e.target.value)}
          />
          {errors.databits && <small className="p-error">{errors.databits}</small>}
        </div>
        <div className="field col-12">
          <label htmlFor="stopbits">Stopbits:</label>
          <InputText
            id="stopbits"
            value={formData.stopbits}
            onChange={(e) => handleInputChange('stopbits', e.target.value)}
          />
          {errors.stopbits && <small className="p-error">{errors.stopbits}</small>}
        </div>
      </div>
  );
};

export default SerialForm;
