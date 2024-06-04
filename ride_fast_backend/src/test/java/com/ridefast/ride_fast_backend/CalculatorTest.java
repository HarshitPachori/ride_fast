package com.ridefast.ride_fast_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CalculatorTest {

  @Mock
  Calculator calculatorMock;

  @BeforeEach
  public void setUp() {
    calculatorMock = new Calculator();
  }

  @Test
  void testAdd_Success() {
    int result = calculatorMock.add(3, 5);
    assertEquals(8, result);
  }

  // @Test
  // void testAdd_Failure() {
  // // Mocking the behavior of the add method to return an incorrect result
  // when(calculatorMock.add(3, 5)).thenReturn(9); // incorrect result
  // int result = calculatorMock.add(3, 5);

  // // Since we expect the add method to return 8, this assertion should fail
  // assertEquals(8, result);
  // }

  // @Test
  // void testAdd_Exception() {
  // // Test for an exception when adding large numbers
  // assertThrows(ArithmeticException.class, () ->
  // calculatorMock.add(Integer.MAX_VALUE, 1));
  // }
}