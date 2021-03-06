import React, { FC } from 'react'
import { Button } from 'antd'
import { withTheme, FormProps } from '@rjsf/core'
import { Theme as AntDTheme } from '@rjsf/antd'

import MaskedInput from './MaskedInput'
import tenantConfigSchema from '../schemas/tenantConfigSchema'
import { masks } from '../constants'

const Form = withTheme(AntDTheme)

interface Props
  extends Omit<FormProps<TenantConfig>, 'schema' | 'uiSchema' | 'formData'> {
  initialValue?: TenantConfig
}

type CurrencyInputProps = {
  value: string
  onChange: (data: string) => void
  disabled: boolean
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <MaskedInput
      disabled={disabled}
      experimentalNumber
      mask={masks.REAL}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const uiSchema = {
  paymentMethods: {
    items: {
      description: {
        'ui:widget': 'textarea',
      },
    },
  },
  deliveryFee: {
    'ui:widget': CurrencyInput,
  },
  items: {
    items: {
      price: {
        'ui:widget': CurrencyInput,
      },
    },
  },
}

const TenantForm: FC<Props> = ({ initialValue, ...props }) => {
  return (
    <div className="flex flex-column w-100 bg-light-gray br3 pa2 tc">
      <Form
        {...props}
        schema={tenantConfigSchema}
        uiSchema={uiSchema}
        formData={initialValue}
      >
        <Button type="primary" size="large" htmlType="submit">
          Salvar Dados
        </Button>
      </Form>
    </div>
  )
}

export default TenantForm
