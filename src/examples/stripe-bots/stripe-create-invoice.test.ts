import { MockClient } from '@medplum/mock';
import { expect, test } from 'vitest';
import { handler } from './stripe-create-invoice';

const medplum = new MockClient();
// npm t src/examples/stripe-bots/stripe-create-invoice.test.ts

test('Create PDF', async () => {
  // This input is a Stripe Event object https://stripe.com/docs/webhooks/stripe-events
  const input = {
    object: {
      id: 'in_1KnN0G589O8KAxCGfVSpD0Pj',
      object: 'invoice',
      account_country: 'US',
      account_name: 'Janet Coffee Shop',
      account_tax_ids: null,
      amount_due: 99,
      amount_paid: 99,
      amount_remaining: 0,
      application_fee_amount: null,
      attempt_count: 1,
      attempted: true,
      auto_advance: false,
      automatic_tax: {
        enabled: false,
        status: null,
      },
      billing_reason: 'subscription_create',
      charge: 'ch_1KnN0H589O8KAxCG0IqjM8v8',
      collection_method: 'charge_automatically',
      created: 1649682600,
      currency: 'usd',
      custom_fields: null,
      customer: 'cus_LULhdiX2gHcuNT',
      customer_address: {
        city: null,
        country: 'US',
        line1: null,
        line2: null,
        postal_code: '90210',
        state: null,
      },
      customer_email: 'test@test.com',
      customer_name: 'Test',
      customer_phone: null,
      customer_shipping: null,
      customer_tax_exempt: 'none',
      customer_tax_ids: [],
      default_payment_method: null,
      default_source: null,
      default_tax_rates: [],
      description: 'Tuition installment.',
      discount: null,
      discounts: [],
      due_date: null,
      ending_balance: 0,
      footer: '420 Montgomery Street, San Francisco, CA 94104',
      hosted_invoice_url:
        'https://invoice.stripe.com/i/acct_18DT589O8KAxCGbLmxyZ/test_YWNjdF8yOERUNTg5TzhLQXhDR2JMbXh5WixfTFVMaEo1ckg2cXA1cjFUOFBTU1AxTE9FcDdKbHJFZCw0MDIyMzQwOA0200EwS5uUM5?s=ap',
      invoice_pdf:
        'https://pay.stripe.com/invoice/acct_18DT589O8KAxCGbLmxyZ/test_YWNjdF8yOERUNTg5TzhLQXhDR2JMbXh5WixfTFVMaEo1ckg2cXA1cjFUOFBTU1AxTE9FcDdKbHJFZCw0MDIyMzQwOA0200EwS5uUM5/pdf?s=ap',
      last_finalization_error: null,
      lines: {
        object: 'list',
        data: [
          {
            id: 'il_0KnN0G589O8KAxCGuqWhuKYO',
            object: 'line_item',
            amount: 99,
            currency: 'usd',
            description: '1 × Introductory offer (Monthly) (at $0.99 / month)',
            discount_amounts: [],
            discountable: true,
            discounts: [],
            livemode: false,
            metadata: {},
            period: {
              end: 1652274600,
              start: 1649682600,
            },
            plan: {
              id: 'price_1Kmhjm589O8KAxCGnMJtfu6r',
              object: 'plan',
              active: true,
              aggregate_usage: null,
              amount: 99,
              amount_decimal: '99',
              billing_scheme: 'per_unit',
              created: 1649523974,
              currency: 'usd',
              interval: 'month',
              interval_count: 1,
              livemode: false,
              metadata: {},
              nickname: null,
              product: 'prod_ATf3hPBeLwaN50',
              tiers_mode: null,
              transform_usage: null,
              trial_period_days: null,
              usage_type: 'licensed',
            },
            price: {
              id: 'price_1Kmhjm589O8KAxCGnMJtfu6r',
              object: 'price',
              active: true,
              billing_scheme: 'per_unit',
              created: 1649523974,
              currency: 'usd',
              livemode: false,
              lookup_key: null,
              metadata: {},
              nickname: null,
              product: 'prod_ATf3hPBeLwaN50',
              recurring: {
                aggregate_usage: null,
                interval: 'month',
                interval_count: 1,
                trial_period_days: null,
                usage_type: 'licensed',
              },
              tax_behavior: 'unspecified',
              tiers_mode: null,
              transform_quantity: null,
              type: 'recurring',
              unit_amount: 99,
              unit_amount_decimal: '99',
            },
            proration: false,
            proration_details: {
              credited_items: null,
            },
            quantity: 1,
            subscription: 'sub_1KnN0G589O8KAxCGz5nN2krq',
            subscription_item: 'si_LULhDM2vvvt7yZ',
            tax_amounts: [],
            tax_rates: [],
            type: 'subscription',
          },
        ],
        has_more: false,
        total_count: 1,
        url: '/v1/invoices/in_1KnN0G589O8KAxCGfVSpD0Pj/lines',
      },
      livemode: false,
      metadata: {},
      next_payment_attempt: null,
      number: 'A361E1E1-0001',
      on_behalf_of: null,
      paid: true,
      paid_out_of_band: false,
      paper_checks: [],
      payment_intent: 'pi_1KnN0H589O8KAxCG0tStyj9d',
      payment_settings: {
        payment_method_options: null,
        payment_method_types: null,
      },
      period_end: 1649682600,
      period_start: 1649682600,
      post_payment_credit_notes_amount: 0,
      pre_payment_credit_notes_amount: 0,
      quote: null,
      receipt_number: null,
      starting_balance: 0,
      statement_descriptor: null,
      status: 'paid',
      status_transitions: {
        finalized_at: 1649682600,
        marked_uncollectible_at: null,
        paid_at: 1649682604,
        voided_at: null,
      },
      subscription: 'sub_1KnN0G589O8KAxCGz5nN2krq',
      subtotal: 99,
      tax: null,
      test_clock: null,
      total: 99,
      total_discount_amounts: [],
      total_tax_amounts: [],
      transfer_data: null,
      webhooks_delivered_at: null,
    },
  };
  const contentType = 'json';

  const result = await handler(medplum, { input, contentType, secrets: {} });
  expect(result).toBeDefined();
});
