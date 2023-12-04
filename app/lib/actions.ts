'use server';
// "use server" significa que todas las funciones que se exportan en este archivo son de servidor y por lo tanto no se ejecutan ni se envían al cliente.

import { z } from 'zod';
import { Invoice } from './definitions';

// Definiendo un esquema para validar los datos que recibimos del cliente.
const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'pending']),
  date: z.string(),
});

// Definiendo un esquema para omitir los campos que no queremos que el cliente pueda enviar.
const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
  id: true,
  date: true,
});

export async function createInvoice(formData: FormData) {
  //console.log('createInvoice', formData);

  //Validando que los datos que recibimos del cliente sean correctos.
  const { customerId, amount, status } = CreateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  //Transformando amount en centavos para evitar errores de redondeo.
  const amountInCents = amount * 100;

  //Creando Fecha Actual.
  const [date] = new Date().toISOString().split('T');

  //console.log(customerId, amountInCents, status, date);

  //insertando un nuevo Invoice en la base de datos.
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}
