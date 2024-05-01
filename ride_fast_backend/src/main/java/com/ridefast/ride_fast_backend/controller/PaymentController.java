package com.ridefast.ride_fast_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.ridefast.ride_fast_backend.dto.MessageResponse;
import com.ridefast.ride_fast_backend.dto.PaymentLinkResponse;
import com.ridefast.ride_fast_backend.enums.PaymentStatus;
import com.ridefast.ride_fast_backend.exception.ResourceNotFoundException;
import com.ridefast.ride_fast_backend.model.PaymentDetails;
import com.ridefast.ride_fast_backend.model.Ride;
import com.ridefast.ride_fast_backend.repository.RideRepository;
import com.ridefast.ride_fast_backend.service.RideService;
import com.ridefast.ride_fast_backend.service.UserService;

import lombok.RequiredArgsConstructor;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentController {
  private final UserService userService;
  private final RideService rideService;
  private final RideRepository rideRepository;

  @PostMapping("/payments/{rideId}")
  public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable("rideId") Long rideId,
      @RequestHeader("Authorization") String jwtToken) throws RazorpayException, ResourceNotFoundException {
    Ride ride = rideService.findRideById(rideId);
    try {
      RazorpayClient razorpayClient = new RazorpayClient("rzp_test_wlqxFlOHORAj5h", "X3ZBxa1kiDBK0UHY2KtlJ21h");
      JSONObject paymentLinkRequest = new JSONObject();
      paymentLinkRequest.put("amount", (int) Math.round(ride.getFare()) * 100);
      paymentLinkRequest.put("currency", "INR");

      JSONObject customer = new JSONObject();
      customer.put("name", ride.getUser().getFullName());
      customer.put("contact", ride.getUser().getMobile());
      customer.put("email", ride.getUser().getEmail());
      paymentLinkRequest.put("customer", customer);

      JSONObject notify = new JSONObject();
      notify.put("sms", true);
      notify.put("email", true);
      paymentLinkRequest.put("notify", notify);

      paymentLinkRequest.put("reminder_enable", true);

      paymentLinkRequest.put("callback_url", "http://localhost:3000/ride/" + ride.getId() + "/payment/success");
      paymentLinkRequest.put("callback_method", "get");
      PaymentLink payment = razorpayClient.paymentLink.create(paymentLinkRequest);

      String paymentLinkId = payment.get("id");
      String paymentLinkUrl = payment.get("short_url");

      PaymentLinkResponse res = new PaymentLinkResponse(paymentLinkUrl, paymentLinkId);

      System.out.println("Payment link ID: " + res.getPaymentLinkId());
      System.out.println("Payment link URL: " + res.getPaymentLinkUrl());

      return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.ACCEPTED);

    } catch (Exception e) {
      System.out.println("Error creating payment link: " + e.getMessage());
      throw new RazorpayException(e.getMessage());
    }
  }

  @GetMapping("/payments")
  public ResponseEntity<MessageResponse> redirect(@RequestParam(name = "payment_id") String paymentId,
      @RequestParam("order_id") Long rideId) throws RazorpayException, ResourceNotFoundException {
    RazorpayClient razorpay = new RazorpayClient("rzp_test_wlqxFlOHORAj5h", "X3ZBxa1kiDBK0UHY2KtlJ21h");
    Ride ride = rideService.findRideById(rideId);

    try {

      Payment payment = razorpay.payments.fetch(paymentId);
      System.out.println("payment details --- " + payment + payment.get("status"));

      if (payment.get("status").equals("captured")) {
        System.out.println("payment details --- " + payment + payment.get("status"));
        if (ride.getPaymentDetails() == null) {
          ride.setPaymentDetails(new PaymentDetails());
        }
        ride.getPaymentDetails().setPaymentId(paymentId);
        ride.getPaymentDetails().setPaymentStatus(PaymentStatus.COMPLETED);

        // order.setOrderItems(order.getOrderItems());
        System.out.println(ride.getPaymentDetails().getPaymentStatus() + "payment status ");
        rideRepository.save(ride);
        ;
      }
      MessageResponse res = new MessageResponse("your order get placed");
      return new ResponseEntity<>(res, HttpStatus.OK);

    } catch (Exception e) {
      System.out.println("errrr payment -------- ");
      new RedirectView("http://localhost:3000/payment/failed");
      throw new RazorpayException(e.getMessage());
    }

  }

}
