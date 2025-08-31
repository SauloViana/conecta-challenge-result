'use client';

import { useRef, useEffect, useState, TdHTMLAttributes } from 'react';
import { Tooltip } from '@material-tailwind/react';

/**
 * Componente para tratar uma célula da tabela com muitos emails
 * @param recipients
 * @returns td
 */
const EmailCell: React.FC<{ recipients: string }> = ({ recipients }) => {
    const containerRef = useRef<HTMLTableCellElement>(null);
    const [visible, setVisible] = useState<string[]>([]);
    const [hiddenCount, setHiddenCount] = useState(0);

    useEffect(() => {
        const elementDOM = containerRef.current;
        if (!elementDOM) return;

        const calculateVisible = () => {
            const emails = recipients.split(',').map(r => r.trim());
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
    }, [recipients]);

    return (
        <Tooltip
            ref={containerRef}
            content={`+${hiddenCount} e-mail${hiddenCount > 1 ? 's' : ''}`}
            open={hiddenCount > 0 ? null : false}
            placement="right">
            <td className='border p-2 w-1/5 overflow-hidden'>
                <div className='truncate'>
                    {visible.join(', ')}
                    {hiddenCount > 0 && (<>{visible.length > 0 ? ',' : ''}...</>)}
                </div>
            </td>
        </Tooltip>
    );
}

export default EmailCell;