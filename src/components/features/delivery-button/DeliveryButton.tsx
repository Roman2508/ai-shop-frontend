import React from "react";

interface IDeliveryButtonProps {
  classNames?: string;
  setDeliveryData: (data: { city: string; street: string; postOffice: string }) => void;
}

const DeliveryButton: React.FC<IDeliveryButtonProps> = ({ setDeliveryData, classNames = "" }) => {
  const novaPoshtaButton = React.useRef<HTMLDivElement | null>(null);
  const modalOverlayElement = React.useRef<HTMLDivElement | null>(null);
  const modalIframe = React.useRef<HTMLIFrameElement | null>(null);
  const textDivs = React.useRef<HTMLSpanElement | null>(null);
  const textDescription = React.useRef<HTMLDivElement | null>(null);
  const selectPostOffice = React.useRef<HTMLSpanElement | null>(null);

  let latitude = "";
  let longitude = "";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        latitude = String(position.coords.latitude);
        longitude = String(position.coords.longitude);
      },
      (error) => {
        console.error("Помилка отримання геолокації:", error);
      }
    );
  } else {
    console.error("Ваш браузер не підтримує геолокацію.");
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const queryParams: any = {};

    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  function openFrame() {
    if (!novaPoshtaButton.current || !modalOverlayElement.current || !modalIframe.current) return;

    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

    const modalOverlay = modalOverlayElement.current;
    modalOverlay.style.display = "flex";
    const iframe = modalIframe.current;
    iframe.src = "https://widget.novapost.com/division/index.html";
    const queryParams = getQueryParams();
    const domain = window.location.hostname;
    const button = novaPoshtaButton.current;
    const id = button.dataset.selectedDepartmentId ?? null;
    const data = {
      placeName: "Київ",
      latitude: latitude,
      longitude: longitude,
      domain: domain,
      id,
      ...queryParams,
    };
    iframe.onload = () => {
      iframe.contentWindow && iframe.contentWindow.postMessage(data, "*");
    };

    window.addEventListener("message", handleFrameMessage);
  }

  function closeFrame() {
    if (!modalOverlayElement.current || !modalIframe.current) return;

    document.getElementsByTagName("body")[0].style.overflowY = "auto";

    const modalOverlay = modalOverlayElement.current;
    modalOverlay.style.display = "none";
    const iframe = modalIframe.current;
    iframe.src = "";

    window.removeEventListener("message", handleFrameMessage);
  }

  const handleFrameMessage = (event: any) => {
    if (event.origin !== "https://widget.novapost.com") {
      console.warn("Повідомлення з невідомого джерела:", event.origin);
      return;
    }

    if (event.data && typeof event.data === "object") {
      const selectedPlaceText = event.data.shortName || "Обрати відділення або поштомат";
      const selectedDescriptionText = `${event.data.addressParts?.city || ""} вул. ${
        event.data.addressParts?.street || ""
      }, ${event.data.addressParts?.building || ""}`;

      setDeliveryData({
        city: event.data.addressParts?.city,
        street: event.data.addressParts?.street + " " + event.data.addressParts?.building,
        postOffice: event.data.shortName,
      });

      if (textDivs.current) {
        textDivs.current.textContent = selectedPlaceText;
        textDivs.current.style.marginBottom = "5px";
      }

      if (selectPostOffice.current) {
        selectPostOffice.current.style.display = "none";
      }

      if (textDescription.current) {
        textDescription.current.textContent = selectedDescriptionText;
      }

      if (novaPoshtaButton.current) {
        novaPoshtaButton.current.dataset.selectedDepartmentId = event.data.id;
      }

      closeFrame();
      return;
    }

    if (event.data === "closeFrame") {
      closeFrame();
    }
  };

  return (
    <>
      <div
        ref={novaPoshtaButton}
        onClick={() => openFrame()}
        className={`flex py-[11px] pl-[16px] pr-[40px] h-[50px] border border-border cursor-pointer w-full max-w-[434px] relative mb-[20px] items-center gap-[10px] flex-row rounded-md ${classNames}`}
      >
        <div className="flex items-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9401 16.4237H16.0596V21.271H19.2101L15.39 25.0911C14.6227 25.8585 13.3791 25.8585 12.6118 25.0911L8.79166 21.271H11.9401V16.4237ZM21.2688 19.2102V8.78972L25.091 12.6098C25.8583 13.3772 25.8583 14.6207 25.091 15.3881L21.2688 19.2102ZM16.0596 6.73099V11.5763H11.9401V6.73099H8.78958L12.6097 2.90882C13.377 2.14148 14.6206 2.14148 15.3879 2.90882L19.2101 6.73099H16.0596ZM2.90868 12.6098L6.72877 8.78972V19.2102L2.90868 15.3901C2.14133 14.6228 2.14133 13.3772 2.90868 12.6098Z"
              fill="#DA291C"
            />
          </svg>
        </div>
        <div className="absolute top-[50%] translate-y-[-50%] right-[20px] h-[16px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#475569"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.49399 1.44891L10.0835 5.68541L10.1057 5.70593C10.4185 5.99458 10.6869 6.24237 10.8896 6.4638C11.1026 6.69642 11.293 6.95179 11.4023 7.27063C11.5643 7.74341 11.5643 8.25668 11.4023 8.72946C11.293 9.0483 11.1026 9.30367 10.8896 9.53629C10.6869 9.75771 10.4184 10.0055 10.1057 10.2942L10.0835 10.3147L5.49398 14.5511L4.47657 13.4489L9.06607 9.21246C9.40722 8.89756 9.62836 8.69258 9.78328 8.52338C9.93272 8.36015 9.96962 8.28306 9.98329 8.24318C10.0373 8.08559 10.0373 7.9145 9.98329 7.7569C9.96963 7.71702 9.93272 7.63993 9.78328 7.4767C9.62837 7.3075 9.40722 7.10252 9.06608 6.78761L4.47656 2.55112L5.49399 1.44891Z"
            />
          </svg>
        </div>
        <div className="flex flex-col font-medium">
          <span className="text-base leading-[16px]" ref={textDivs}></span>
          <span className="text-sm leading-[16px]" ref={textDescription}></span>
          <span className="text-sm text-regular leading-[18px]" ref={selectPostOffice}>
            Обрати відділення або поштомат
          </span>
        </div>
      </div>

      <div
        ref={modalOverlayElement}
        className="fixed top-[0] left-[0] w-full h-full bg-layout hidden justify-center items-center z-[1000]"
      >
        <div
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", backgroundColor: "#fff" }}
          className={`relative w-[80%] h-[80%] overflow-hidden rounded-md`}
        >
          <header className="relative h-[80px] px-[20px] leading-[80px] border-b-[1px] border-border">
            <h2 className="m-[0] text-xl leading-[80px] font-bold">Вибрати відділення</h2>
            <span
              className="cursor-pointer text-3xl absolute right-[0] top-[15px] w-[40px] h-[40px]"
              onClick={() => closeFrame()}
            >
              &times;
            </span>
          </header>

          <iframe
            className="w-full h-full md:h-[calc(100%-81px)] border-0"
            allow="geolocation"
            ref={modalIframe}
            src=""
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default DeliveryButton;
