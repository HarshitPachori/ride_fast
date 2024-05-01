package com.ridefast.ride_fast_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentLinkResponse {
  private String paymentLinkUrl;
  private String paymentLinkId;
}
