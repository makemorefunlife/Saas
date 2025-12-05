/**
 * @file CheckoutForm.tsx
 * @description 주문 폼 컴포넌트
 *
 * 배송지 정보 및 주문 메모를 입력하는 폼
 * react-hook-form + Zod로 검증
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrderAction } from "@/actions/orders";
import { formatPrice } from "@/lib/utils/formatPrice";

const checkoutSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(/^[0-9-]+$/, "올바른 전화번호 형식이 아닙니다"),
  postcode: z.string().min(1, "우편번호를 입력해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
  detailAddress: z.string().optional(),
  orderNote: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  totalAmount: number;
}

export default function CheckoutForm({ totalAmount }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      const result = await createOrderAction({
        shippingAddress: {
          name: data.name,
          phone: data.phone,
          postcode: data.postcode,
          address: data.address,
          detailAddress: data.detailAddress,
        },
        orderNote: data.orderNote,
      });

      if (result.success && result.orderId) {
        router.push(`/checkout/success?orderId=${result.orderId}`);
      } else {
        alert(result.error || "주문 생성에 실패했습니다.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("주문 생성 중 오류가 발생했습니다.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* 배송지 정보 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">배송지 정보</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-white/90">
            이름 *
          </Label>
          <Input
            id="name"
            {...register("name")}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            placeholder="홍길동"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-white/90">
            전화번호 *
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            placeholder="010-1234-5678"
          />
          {errors.phone && (
            <p className="text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="postcode" className="text-white/90">
            우편번호 *
          </Label>
          <Input
            id="postcode"
            {...register("postcode")}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            placeholder="12345"
          />
          {errors.postcode && (
            <p className="text-sm text-red-400">{errors.postcode.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-white/90">
            기본주소 *
          </Label>
          <Input
            id="address"
            {...register("address")}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            placeholder="서울시 강남구 테헤란로 123"
          />
          {errors.address && (
            <p className="text-sm text-red-400">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="detailAddress" className="text-white/90">
            상세주소
          </Label>
          <Input
            id="detailAddress"
            {...register("detailAddress")}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            placeholder="101호 (선택사항)"
          />
          {errors.detailAddress && (
            <p className="text-sm text-red-400">
              {errors.detailAddress.message}
            </p>
          )}
        </div>
      </div>

      {/* 주문 메모 */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="orderNote" className="text-white/90">
          주문 메모 (선택사항)
        </Label>
        <Textarea
          id="orderNote"
          {...register("orderNote")}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
          placeholder="배송 시 요청사항을 입력해주세요"
          rows={4}
        />
      </div>

      {/* 주문 버튼 */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "주문 처리 중..." : `주문하기 (${totalAmount.toLocaleString()}원)`}
      </Button>
    </form>
  );
}

