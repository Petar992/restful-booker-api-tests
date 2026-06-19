let bookingId;

const bookingData = {
  firstname: "Marko",
  lastname: "Markovic",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2026-06-20",
    checkout: "2026-06-25",
  },
  additionalneeds: "Breakfast",
};

describe("Restful Booker API Tests", () => {
  it("TC01 - Create booking with valid data", () => {
    cy.request({
      method: "POST",
      url: "/booking",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: bookingData,
    }).then((response) => {
      // Verify response status code
      expect(response.status).to.eq(200);

      // Verify booking ID exist
      expect(response.body).to.have.property("bookingid");

      // Verify booking ID is a positive number
      expect(response.body.bookingid)
        .to.be.a("number")
        .and.to.be.greaterThan(0);

      // Store booking ID for subsequent tests
      bookingId = response.body.bookingid;

      // Verify booking object exist
      expect(response.body).to.have.property("booking");

      // Verify booking data
      expect(response.body.booking.firstname).to.eq(bookingData.firstname);

      expect(response.body.booking.lastname).to.eq(bookingData.lastname);

      expect(response.body.booking.totalprice).to.eq(bookingData.totalprice);

      expect(response.body.booking.depositpaid).to.eq(bookingData.depositpaid);

      expect(response.body.booking.bookingdates.checkin).to.eq(
        bookingData.bookingdates.checkin,
      );

      expect(response.body.booking.bookingdates.checkout).to.eq(
        bookingData.bookingdates.checkout,
      );

      expect(response.body.booking.additionalneeds).to.eq(
        bookingData.additionalneeds,
      );

      // Verify data types
      expect(response.body.booking.firstname).to.be.a("string");

      expect(response.body.booking.lastname).to.be.a("string");

      expect(response.body.booking.totalprice).to.be.a("number");

      expect(response.body.booking.depositpaid).to.be.a("boolean");

      expect(response.body.booking.additionalneeds).to.be.a("string");
    });
  });

  it("TC02 - Retrieve created booking by ID", () => {
    cy.request({
      method: "GET",
      url: `/booking/${bookingId}`,
    }).then((response) => {
      // Validate response status
      expect(response.status).to.eq(200);

      // Validate booking details
      expect(response.body.firstname).to.eq(bookingData.firstname);

      expect(response.body.lastname).to.eq(bookingData.lastname);

      expect(response.body.totalprice).to.eq(bookingData.totalprice);

      expect(response.body.depositpaid).to.eq(bookingData.depositpaid);

      expect(response.body.bookingdates.checkin).to.eq(
        bookingData.bookingdates.checkin,
      );

      expect(response.body.bookingdates.checkout).to.eq(
        bookingData.bookingdates.checkout,
      );

      expect(response.body.additionalneeds).to.eq(bookingData.additionalneeds);
    });
  });
});
