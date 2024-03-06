package com.ridefast.ride_fast_backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.ridefast.ride_fast_backend.dto.CustomExceptionResponse;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<CustomExceptionResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex,
      WebRequest req) {
    CustomExceptionResponse response = new CustomExceptionResponse(HttpStatus.NOT_FOUND.value(),
        HttpStatus.NOT_FOUND.getReasonPhrase(), ex.getMessage(), req.getDescription(false),
        LocalDateTime.now());
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(UserException.class)
  public ResponseEntity<CustomExceptionResponse> userExceptionHandler(UserException ex, WebRequest req) {
    CustomExceptionResponse response = new CustomExceptionResponse(
        HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(),
        ex.getMessage(),
        req.getDescription(false),
        LocalDateTime.now());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> methodArguementNotValidHandler(MethodArgumentNotValidException ex,
      WebRequest req) {
    Map<String, Object> mapResponse = new HashMap<>();
    mapResponse.put("status", HttpStatus.BAD_REQUEST.value());
    mapResponse.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
    Map<String, String> validationErrors = new HashMap<>();
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
      validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    mapResponse.put("validations", validationErrors);
    // ex.getAllErrors().forEach(error -> {
    // String fieldName = ((FieldError) error).getField();
    // String message = error.getDefaultMessage();
    // mapResponse.put(fieldName, message);
    // });
    mapResponse.put("path", req.getDescription(false));
    mapResponse.put("timestamp", LocalDateTime.now().toString());
    return new ResponseEntity<>(mapResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<CustomExceptionResponse> validationExceptionHandler(ConstraintViolationException ex,
      WebRequest req) {
    StringBuilder sb = new StringBuilder();
    for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
      sb.append(violation.getMessage() + "\n");
    }
    CustomExceptionResponse response = new CustomExceptionResponse(
        HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(),
        ex.getMessage(),
        req.getDescription(false),
        LocalDateTime.now());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<CustomExceptionResponse> handleHttpMessageNotReadableHandler(HttpMessageNotReadableException ex,
      WebRequest req) {
    CustomExceptionResponse response = new CustomExceptionResponse(HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(), "Required Request Body missing", req.getDescription(false),
        LocalDateTime.now());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CustomExceptionResponse> handleOtherException(Exception ex, WebRequest req) {
    CustomExceptionResponse response = new CustomExceptionResponse(
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
        ex.getMessage(),
        req.getDescription(false),
        LocalDateTime.now());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
