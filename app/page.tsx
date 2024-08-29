import { RegisterUserForm } from '@/components/forms/register-user-form'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | PassKey Modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/vita-care-logo-noslogan.svg"
            alt="VitaCare Logo"
            width={400}
            height={245}
            className="w-[200px]"
            priority
          />

          <RegisterUserForm />

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
        src="/assets/images/onboarding-img.png"
        alt="Medical Team Photo"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  )
}
