import React from 'react';
import Mermaid from 'mermaid';

interface MermaidGraphProps {
    chart: string;
}

const MermaidGraph: React.FC<MermaidGraphProps> = ({ chart }) => {
    React.useEffect(() => {
        Mermaid.contentLoaded();
    }, []);

    return (
        <div className="mermaid">
            {chart}
        </div>
    );
};

export default MermaidGraph;