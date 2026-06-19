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
  describe("Create Booking", () => {
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

        expect(response.body.booking.depositpaid).to.eq(
          bookingData.depositpaid,
        );

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
  });

  describe("Read Booking", () => {
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

        expect(response.body.additionalneeds).to.eq(
          bookingData.additionalneeds,
        );
      });
    });
  });

  describe("Authentication", () => {
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
  });

  describe("Update Booking", () => {
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

  describe("Delete Booking", () => {
    it("TC06 - Delete booking with valid authentication", () => {
      cy.request({
        method: "DELETE",
        url: `/booking/${bookingId}`,
        headers: {
          Cookie: `token=${token}`,
        },
      }).then((response) => {
        // Validate successful deletion
        expect(response.status).to.eq(201);
      });

      cy.request({
        method: "GET",
        url: `/booking/${bookingId}`,
        failOnStatusCode: false,
      }).then((getResponse) => {
        // Verify booking no longer exist
        expect(getResponse.status).to.eq(404);
      });
    });
  });

  describe("Health Check", () => {
    it("TC07 - Verify health check endpoint", () => {
      cy.request({
        method: "GET",
        url: "/ping",
      }).then((response) => {
        // Validate health check response
        expect(response.status).to.eq(201);
      });
    });
  });

  describe("Negative Scenarios", () => {
    it("TC08 - Retrieve non-existing booking", () => {
      cy.request({
        method: "GET",
        url: "/booking/999999999",
        failOnStatusCode: false,
      }).then((response) => {
        // Validate booking is not found
        expect(response.status).to.eq(404);
      });
    });

    it("TC09 - Authentication fails with invalid credentials", () => {
      cy.request({
        method: "POST",
        url: "/auth",
        failOnStatusCode: false,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          username: "admin",
          password: "wrongpassword",
        },
      }).then((response) => {
        // Validate response status
        expect(response.status).to.eq(200);

        // Validate authentication failure response
        expect(response.body).to.have.property("reason");

        expect(response.body.reason).to.eq("Bad credentials");
      });
    });

    it("TC10 - Prevent booking update without authentication", () => {
      cy.request({
        method: "PUT",
        url: `/booking/${bookingId}`,
        failOnStatusCode: false,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: updatedBookingData,
      }).then((response) => {
        // Validate update request is rejected without authentication
        expect(response.status).to.eq(403);
      });
    });

    it("TC11 - Prevent booking deletion without authentication", () => {
      cy.request({
        method: "DELETE",
        url: `/booking/${bookingId}`,
        failOnStatusCode: false,
      }).then((response) => {
        // Validate delete request is rejected without authentication
        expect(response.status).to.eq(403);
      });
    });
  });
});
