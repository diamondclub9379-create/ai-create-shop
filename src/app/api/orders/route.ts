import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, lineId, note, totalPrice, items } = body;

    if (!customerName || !phone || !lineId || !items?.length) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        lineId,
        note: note || null,
        totalPrice,
        items: {
          create: items.map(
            (item: { serviceId: number; quantity: number; price: number }) => ({
              serviceId: item.serviceId,
              quantity: item.quantity,
              price: item.price,
            })
          ),
        },
      },
      include: { items: { include: { service: true } } },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างออเดอร์" },
      { status: 500 }
    );
  }
}
