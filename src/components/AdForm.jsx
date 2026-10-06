import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AdForm = () => {
  const { t, language } = useLanguage();
  const formRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [adTitle, setAdTitle] = useState('');
  const [adImage, setAdImage] = useState(null);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  // Mouse events for drag
  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = formRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, offset]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAdImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`${t('adAdded')}: ${adTitle}`);
  };

  return (
    <div
      ref={formRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        width: 350,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #eee',
        cursor: dragging ? 'grabbing' : 'grab',
        transition: dragging ? 'none' : 'box-shadow 0.2s',
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: '12px 20px',
          background: '#f5f5f5',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          cursor: 'grab',
          fontWeight: 'bold',
          userSelect: 'none',
        }}
        className={getFontClass()}
      >
        {t('addAdvertisement')}
      </div>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }} className={getFontClass()}>{t('adTitle')}</label>
          <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            className={getFontClass()}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }} className={getFontClass()}>{t('adImage')}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: '100%' }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#f59e42',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
          }}
          className={getFontClass()}
        >
          {t('add')}
        </button>
      </form>
    </div>
  );
};

export default AdForm; 