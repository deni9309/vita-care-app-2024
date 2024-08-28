import Image from 'next/image'
import Link from 'next/link'

import { RegisterForm } from '@/components/forms/register-form'
import { getUser } from '@/actions/patient.actions'

export default async function Register({ params: { userId } }: SearchParamProps) {
  const user: User = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | PassKey Modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/vita-care-logo.svg"
            alt="VitaCare Logo"
            width={400}
            height={245}
            className="mb-12 h-28 w-fit"
            priority
          />

          <RegisterForm user={user} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 VitaCare
            </p>
            <Link href="/?admin=true" prefetch className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="Medical Team Photo"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  )
}