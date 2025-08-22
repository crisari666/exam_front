import type { FC } from 'react';

type ExampleComponentProps = {
  title: string;
  description?: string;
};

export const ExampleComponent: FC<ExampleComponentProps> = ({ 
  title, 
  description = 'Default description' 
}) => {
  return (
    <div className="example-component">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
