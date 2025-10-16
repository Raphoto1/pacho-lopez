import { NextResponse } from "next/server";
import { insertSubscription } from "@/dao/dao";
import * as XLSX from 'xlsx';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    await insertSubscription({ name, email });
    return NextResponse.json({ message: "Subscription successful" }, { status: 200 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    
    if (error.message === 'Email already subscribed') {
      return NextResponse.json({ message: "Email already subscribed" }, { status: 409 });
    }
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { getAllSubscriptions } = await import("@/dao/dao");
    const subscriptions = await getAllSubscriptions();

    // Verificar formato solicitado
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    if (format === 'csv') {
      // Generar CSV
      const csvHeaders = 'Name,Email,Subscribed At,Active\n';
      const csvRows = subscriptions.map(sub => {
        const subscribedAt = new Date(sub.subscribedAt).toISOString().split('T')[0];
        return `"${sub.name}","${sub.email}","${subscribedAt}","${sub.active}"`;
      }).join('\n');

      const csvContent = csvHeaders + csvRows;
      const fileName = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      });
    }

    if (format === 'excel' || format === 'xlsx') {
      // Generar Excel
      const workbook = XLSX.utils.book_new();
      
      const worksheetData = subscriptions.map(sub => ({
        Name: sub.name,
        Email: sub.email,
        'Subscribed At': new Date(sub.subscribedAt).toISOString().split('T')[0],
        Active: sub.active
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Newsletter Subscriptions');

      const fileName = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.xlsx`;
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      return new NextResponse(excelBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      });
    }

    // Respuesta JSON por defecto
    return NextResponse.json({ subscriptions }, { status: 200 });
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}