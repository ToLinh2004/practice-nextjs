'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { mutate } from 'swr';
import { MouseEvent } from '@/app/types';
import { toast } from 'react-toastify';
import { updateContact } from '@/app/services/config';
import { Contact } from '@/app/types';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/app/context/ChangeLanguageContext';


interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  contact: Contact;
}

export default function UpdateContactModal({ showModalUpdate, setShowModalUpdate, contact }: IProps) {
  const [replyMessage, setReplyMessage] = useState<string>('');
const { language } = useLanguage();

  const handleUpdateSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    const templateParam = {
      full_name: contact.fullName,
      from_name: 'nguyenthilinhqni2020@gmail.com',
      to_name: contact.email,
      replyMessage: replyMessage,
    };
    try {
      const emailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN_ID ?? '',
        templateParam,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      );

      console.log('SUCCESS!', emailResponse.status, emailResponse.text);

      const changeStatus = {
        ...contact,
        status: 'Replied',
      };
      console.log(changeStatus);
      const res = await updateContact(contact.id, changeStatus);
      if (res) {
        toast.success('Reply email successfully');
        setShowModalUpdate(false);
        mutate('https://65200b03906e276284c3f31a.mockapi.io/contacts');
      } else {
        toast.error('Reply email failed');
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('Failed to send email or Reply email');
    }
  };

  const handleCancel = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className="text-xl font-bold">{language === 'en' ? 'Reply Feedback' : 'Trả lời'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">{language === 'en' ? 'Full Name' : 'Họ và tên'}</Form.Label>
              <Form.Control type="text" className="bg-gray-50" value={contact.fullName} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">Email</Form.Label>
              <Form.Control type="text" className="bg-gray-50" value={contact.email} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">{language === 'en' ? 'Phone' : 'Số điện thoại'}</Form.Label>
              <Form.Control type="text" className="bg-gray-50" value={contact.phone} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">{language == 'en' ? 'Message' : ' Tin nhắn'}</Form.Label>
              <Form.Control type="text" className="bg-gray-50" value={contact.message} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">{language === 'en' ? 'Status' : 'Trạng thái'}</Form.Label>
              <Form.Control type="text" className="bg-gray-50" value={contact.status} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-2sm font-bold">{language === 'en' ? 'Reply' : 'Trả lời'}</Form.Label>
              <textarea
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 outline-none"
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            {language === 'en' ? 'Cancel' : 'Hủy'}
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            {language === 'en' ? 'Send' : 'Gửi'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
