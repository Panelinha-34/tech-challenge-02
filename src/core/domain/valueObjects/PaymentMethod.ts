import { ValueObject } from "../base/entities/ValueObject";
import { UnsupportedArgumentValueError } from "../base/errors/entities/UnsupportedArgumentValueError";
import { PaymentMethodEnum } from "../enums/PaymentMethodEnum";

export interface PaymentMethodProps {
  name: PaymentMethodEnum;
}

export class PaymentMethod extends ValueObject<PaymentMethodProps> {
  constructor(props: PaymentMethodProps) {
    super({
      ...props,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Object.values(PaymentMethodEnum).includes(props.name as any)) {
      throw new UnsupportedArgumentValueError(PaymentMethod.name);
    }
  }

  get name() {
    return this.props.name;
  }
}
