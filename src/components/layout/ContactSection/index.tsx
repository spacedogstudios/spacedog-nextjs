'use client';

import {useEffect, useState} from 'react';
import {useForm, FieldErrors} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { contactSchema, TContactSchema } from '@/globals/schema';
import Section from '@/components/layout/Section';
import type { SectionProps } from '@/types/main';
import Spinner from '@/components/ui/Spinner';
import {NextResponse} from 'next/server';

type FetchResponse = Response & {
  errors?: FieldErrors<TContactSchema>,
}

type Props = SectionProps & {
  submitHandler?: Promise<FetchResponse>
}

function Message(message: String | undefined, className: string = '', role: string = 'alert') {
  const messageClassName = `text-lg text-red-500 pb-4 -mt-2 ${className}`;
  return <div className={messageClassName} role={role}>{message}</div>
}

async function sendData(data: TContactSchema): Promise<Response> {
  return await fetch('/api/sendgrid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export default function ContactSection({route_id, className, subheading, tagline, submitHandler}: Props) {
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const containerClassName = `bg-gray-700 ${className}`;
  const inputClassName = "block w-full appearance-none leading-8 text-lg text-gray-200 \
  bg-transparent border-b outline-none focus:border-b focus:border-sky-600";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const subscription = watch(() =>
      setSubmittedSuccessfully(false)
    )
    return () => subscription.unsubscribe()
  }, [watch])


  const onSubmit = async (data: TContactSchema) => {
    const doSubmit = submitHandler ?? sendData;
    const response = await doSubmit(data);

    const responseData: FetchResponse = await response.json();

    if (!response.ok) {
      setError('root', {
        type: 'server',
        message: responseData?.errors?.root?.message || response.statusText || 'An unknown error occurred.',
      });

      return;
    }

    if (responseData.errors) {
      const errors: FieldErrors<TContactSchema> = responseData.errors;

      if (errors.name) {
        setError('name', {
          type: 'server',
          message: errors.name.message,
        });
      }
      else if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email.message,
        })
      }
      else if (errors.message) {
        setError('message', {
          type: 'server',
          message: errors.message.message,
        });
      }
      else {
        setError('root', {
          type: 'server',
          message: errors.root?.message || 'An unknown error occurred.',
        });
      }

      return;
    }

    reset();
    setSubmittedSuccessfully(true);
  }

  return (
    <Section
      id={route_id}
      className={containerClassName}
      subheading={subheading}
      tagline={tagline}>
      <div className="text-left pt-4 w-full max-w-7xl">
        <h3 className="text-white text-lg uppercase pb-2">Send Us A Message</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {errors.root && Message(errors.root.message, 'pt-4')}
          {submittedSuccessfully && Message('Message sent. You\'ll hear from us soon!', 'text-white text-center pt-4', 'status')}
          <label className="sr-only" htmlFor="name">name</label>
          <input
            id="name"
            autoComplete="name"
            className={inputClassName + '  h-20 mb-4' + (errors.name ? ' border-red-500' : ' border-gray-200')}
            {...register("name")}
            placeholder="Your name"
          />
          {errors.name && Message(errors.name.message)}
          <label className="sr-only" htmlFor="email">email</label>
          <input
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="Your email"
            className={inputClassName + '  h-20 mb-10' + (errors.email ? ' border-red-500' : ' border-gray-200')}
          />
          {errors.email && Message(errors.email.message, '-mt-8 mb-6')}
          <label className="sr-only" htmlFor="message">message</label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            placeholder="Your message"
            className={inputClassName + ' pb-8 mb-8' + (errors.message ? ' border-red-500' : ' border-gray-200')}
          />
          {errors.message && Message(errors.message.message, '-mt-6 mb-4')}
          <button
            disabled={isSubmitting}
            className="relative flex justify-center items-center w-full h-16 bg-sky-600 uppercase text-g text-white"
          >
            <div
              className="relative px-10">
              {isSubmitting && <Spinner
                className="absolute left-0 h-6 w-6"
                spinnerClassName="fill-white text-sky-800"
              />}
              Submit
            </div>
          </button>
        </form>
      </div>
    </Section>
  )
}
