import { emailsData } from '@/data/emailsData';

const EmailTable: React.FC = () => {
  return (
    <table className='text-left border border-separate overflow-scroll table-fixed truncate'>
      <thead>
        <tr>
          <th className='border p-2 w-1/5'>Remetentes</th>
          <th className='border p-2 w-1/5'>Destinatários</th>
          <th className='border p-2 w-3/5'>Mensagem</th>
        </tr>
      </thead>
      <tbody>
        {emailsData.map((email, index) => (
          <tr key={index}>
            <td className='border p-2 w-1/5'>{email.sender}</td>
            <td className='border p-2 w-1/5 overflow-hidden '>
              <div className='w-10'>{email.recipients}</div>
            </td>
            <td className='border p-2 w-3/5'>{email.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmailTable;

