let bookingId;
let token;

const credentials = {
  username: "admin",
  password: "password123",
};

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

const updatedBookingData = {
  firstname: "Marko",
  lastname: "Updated",
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: "2026-07-01",
    checkout: "2026-07-10",
  },
  additionalneeds: "Dinner",
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

  it("TC03 - Generate authentication token with valid credentials", () => {
    cy.request({
      method: "POST",
      url: "/auth",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: credentials,
    }).then((response) => {
      // Validate response status
      expect(response.status).to.eq(200);

      // Validate authentication token
      expect(response.body).to.have.property("token");

      expect(response.body.token).to.be.a("string");

      // Store token for subsequent tests
      token = response.body.token;
    });
  });

  it("TC04 - Update existing booking with valid authentication", () => {
    cy.request({
      method: "PUT",
      url: `/booking/${bookingId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: updatedBookingData,
    }).then((response) => {
      // Validate response status
      expect(response.status).to.eq(200);

      // Validate updated booking details
      expect(response.body.firstname).to.eq(updatedBookingData.firstname);

      expect(response.body.lastname).to.eq(updatedBookingData.lastname);

      expect(response.body.totalprice).to.eq(updatedBookingData.totalprice);

      expect(response.body.depositpaid).to.eq(updatedBookingData.depositpaid);

      expect(response.body.bookingdates.checkin).to.eq(
        updatedBookingData.bookingdates.checkin,
      );

      expect(response.body.bookingdates.checkout).to.eq(
        updatedBookingData.bookingdates.checkout,
      );

      expect(response.body.additionalneeds).to.eq(
        updatedBookingData.additionalneeds,
      );
    });
  });

  it("TC05 - Partially update booking with valid authentication", () => {
    const partialUpdateData = {
      firstname: "Test",
    };

    cy.request({
      method: "PATCH",
      url: `/booking/${bookingId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      body: partialUpdateData,
    }).then((response) => {
      // Validate response status
      expect(response.status).to.eq(200);

      // Validate partially updated booking details
      expect(response.body.firstname).to.eq(partialUpdateData.firstname);

      expect(response.body.lastname).to.eq(updatedBookingData.lastname);

      expect(response.body.totalprice).to.eq(updatedBookingData.totalprice);

      expect(response.body.depositpaid).to.eq(updatedBookingData.depositpaid);

      expect(response.body.additionalneeds).to.eq(
        updatedBookingData.additionalneeds,
      );
    });
  });
});
