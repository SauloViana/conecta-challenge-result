'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * Componente para tratar uma célula da tabela com muitos emails
 * @param recipients
 * @returns td
 */
const EmailCell: React.FC<{ recipients: string }> = ({ recipients }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<string[]>([]);
    const [hiddenCount, setHiddenCount] = useState(0);
    const emails = recipients.split(',').map(r => r.trim());

    useEffect(() => {
        const elementDOM = containerRef.current;
        if (!elementDOM) return;

        const calculateVisible = () => {
            const shown: string[] = [];
            let hidden = 0;
            let totalWidth = 0;

            for (const email of emails) {
                //Cria um span temporário com o email para medir a largura e depois remove do DOM
                const span = document.createElement('span');
                span.style.visibility = 'hidden';
                span.style.position = 'absolute';
                span.style.whiteSpace = 'nowrap';
                span.innerText = email + ', ';
                document.body.appendChild(span);

                const width = span.offsetWidth;
                document.body.removeChild(span);

                if (totalWidth + width <= elementDOM.clientWidth) {
                    totalWidth += width;
                    shown.push(email);
                } else {
                    hidden++;
                }
            }

            setVisible(shown);
            setHiddenCount(hidden);
        };

        calculateVisible();
        window.addEventListener('resize', calculateVisible);
        return () => window.removeEventListener('resize', calculateVisible);
    }, [emails]);

    return (
        <td className='border p-2 w-1/5 overflow-hidden'>
            <div ref={containerRef} className='truncate'>
                {visible.join(', ')}
                {hiddenCount > 0 && (
                    <span title={`+${hiddenCount} e-mail${hiddenCount > 1 ? 's' : ''}`}>
                        …
                    </span>
                )}
            </div>
        </td>
    );
}

export default EmailCell;